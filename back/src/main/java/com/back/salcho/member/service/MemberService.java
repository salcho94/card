package com.back.salcho.member.service;


import com.back.salcho.member.entity.MemberEntity;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public interface MemberService {

    public MemberEntity  duplicateCheck(MemberEntity member);

    public int signupMember(MemberEntity member);

    public int updateTarget(MemberEntity member);

    public MemberEntity loginMember(MemberEntity member);

    Map<String, Object> getStatistics(Map<String, String> reqMap);

    Map<String, String> getMember(String memberId);
}
