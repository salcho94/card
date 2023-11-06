package com.back.salcho.board.service;


import com.back.salcho.board.entity.BoardEntity;

import java.util.List;

public interface BoardService {
    public List<BoardEntity> getBoardList();

    public int insertBoard(BoardEntity board);
}
