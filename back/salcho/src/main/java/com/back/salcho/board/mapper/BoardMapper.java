package com.back.salcho.board.mapper;

import com.back.salcho.board.entity.BoardEntity;
import org.apache.ibatis.annotations.Mapper;


import java.util.List;

@Mapper
public interface BoardMapper {
    List<BoardEntity> getBoardList();
    Integer insertBoard(BoardEntity board);
}
