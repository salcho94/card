package com.back.salcho.member.service;


import com.back.salcho.member.entity.MemberEntity;

import java.util.List;

public interface MemberService {

    public MemberEntity  duplicateCheck(String nickName);

    public int signupMember(MemberEntity member);

    public MemberEntity loginMember(MemberEntity member);
}
