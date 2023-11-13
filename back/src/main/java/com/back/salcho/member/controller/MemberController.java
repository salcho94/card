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
        memberEntity.setType("normal");
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


}