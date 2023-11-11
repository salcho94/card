package com.back.salcho.member.controller;

import com.back.salcho.member.entity.MemberEntity;
import com.back.salcho.member.service.MemberService;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;


@RestController
public class MemberController {
    @Autowired
    private MemberService memberService;

    @GetMapping("/api/member/duplicate")
    @ResponseBody
    public Map<String, String> duplicateCheck(@RequestParam String nickName) {
        Map<String, String> res = new HashMap<>();
        MemberEntity reqMember = new MemberEntity();
        reqMember.setNickName(nickName);
        reqMember.setType("normal");
        MemberEntity member = memberService.duplicateCheck(reqMember);
        if(member == null) {
            res.put("msg","사용 가능한 닉네임 입니다.");
            res.put("success","Y");
        }else{
            res.put("msg","이미 사용중인 닉네임 입니다. 다른 닉네임을 입력해 주세요");
            res.put("success","N");
        }

        return res;
    }


    @PostMapping("/api/member/signup")
    @ResponseBody
    public Map<String, String> signup(MemberEntity memberEntity) {
        Map<String, String> res = new HashMap<>();
        int result = memberService.signupMember(memberEntity);
        if(result>0){
            res.put("success","Y");
            res.put("msg","가입을 성공 하였습니다. 로그인 후 이용해 주세요");
        }else{
            res.put("success","N");
            res.put("msg","가입을 실패 하였습니다.");
        }
        return res;
    }

    @PostMapping("/api/member/signin")
    @ResponseBody
    public Map<String, String> signin(MemberEntity memberEntity) {
        Map<String, String> res = new HashMap<>();
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        memberEntity.setType("normal");
        MemberEntity member = memberService.duplicateCheck(memberEntity);
        if(member != null){
            if(encoder.matches(memberEntity.getPassword(), member.getPassword())){
                MemberEntity result = new MemberEntity();
                result = memberService.loginMember(memberEntity);
                res.put("nickName",result.getNickName());
                res.put("email",result.getEmail());
                res.put("success","Y");
            }else{
                res.put("success","N");
            }
        }else{
            res.put("success","L");
            res.put("msg","존재하지 않는 아이디 입니다.");
        }


    return res;
    }

    @GetMapping("/api/kakao")
    @ResponseBody
    public Map<String,String> kakaoCallback(@RequestParam String accessToken) {
        Map<String, String> res = new HashMap<>();
            HttpHeaders headers = new HttpHeaders();
            headers.add("Authorization", "Bearer " + accessToken);
            headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

            //HttpHeader 담기
            RestTemplate rt = new RestTemplate();
            HttpEntity<MultiValueMap<String, String>> httpEntity = new HttpEntity<>(headers);
            ResponseEntity<String> response = rt.exchange(
                    "https://kapi.kakao.com/v2/user/me",
                    HttpMethod.POST,
                    httpEntity,
                    String.class
            );
        //Response 데이터 파싱
        JSONParser jsonParser = new JSONParser();
        JSONObject jsonObj    = null;
        try {
            jsonObj = (JSONObject) jsonParser.parse(response.getBody());
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
        JSONObject account = (JSONObject) jsonObj.get("kakao_account");
        JSONObject profile = (JSONObject) account.get("profile");

        long id = (long) jsonObj.get("id");
        String email = String.valueOf(account.get("email"));
        String nickName = String.valueOf(profile.get("nickname"));
        MemberEntity reqMember = new MemberEntity();
        reqMember.setNickName(nickName);
        reqMember.setType("kakao");
        MemberEntity member = memberService.duplicateCheck(reqMember);
        int resultYn =0;
        if(member == null) {
            reqMember.setNickName(nickName);
            reqMember.setEmail(email);
            reqMember.setType("kakao");
            resultYn = memberService.signupMember(reqMember);
        }
        res.put("email",email);
        res.put("nickName",nickName);
        res.put("success",(resultYn > 0 ? "Y" : "N"));
        return res;
    }
}