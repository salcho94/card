package com.back.salcho.member.service;


import com.back.salcho.board.mapper.BoardMapper;
import com.back.salcho.member.entity.MemberEntity;
import com.back.salcho.member.mapper.MemberMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MemberServiceImpl implements MemberService {
    @Autowired
    MemberMapper memberMapper;
    @Autowired
    PasswordEncoder bCryptPasswordEncoder;
    public MemberEntity  duplicateCheck(MemberEntity member){
        return memberMapper.duplicateCheck(member);
    }

    @Override
    public int signupMember(MemberEntity member) {
        if(member.getType().equals("normal")){
            member.hashPassword(bCryptPasswordEncoder);
        }
        return memberMapper.signupMember(member);
    }

    @Override
    public MemberEntity loginMember(MemberEntity member) {
        member.hashPassword(bCryptPasswordEncoder);
        System.out.println(member.getPassword());
        return memberMapper.loginMember(member);
    }


}
