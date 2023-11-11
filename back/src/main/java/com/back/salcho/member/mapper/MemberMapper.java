package com.back.salcho.member.mapper;

import com.back.salcho.member.entity.MemberEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MemberMapper {
    public MemberEntity  duplicateCheck(MemberEntity member);

    public int signupMember(MemberEntity member);

    public MemberEntity loginMember(MemberEntity member);
}
