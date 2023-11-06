package com.back.salcho.board.service;


import com.back.salcho.board.entity.BoardEntity;
import com.back.salcho.board.mapper.BoardMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BoardServiceImpl implements BoardService{
    @Autowired
    BoardMapper boardMapper;
    @Override
    public List<BoardEntity> getBoardList() {
        return boardMapper.getBoardList();
    }

    @Override
    public int insertBoard(BoardEntity board){
        return boardMapper.insertBoard(board);
    }
}
