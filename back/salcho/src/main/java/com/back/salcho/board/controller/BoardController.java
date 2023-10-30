package com.back.salcho.board.controller;

import com.back.salcho.board.entity.BoardEntity;
import com.back.salcho.board.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class BoardController {

    @Autowired
    BoardService boardService;

    @GetMapping("/api/board/list")
    @ResponseBody
    public List<BoardEntity> boardList() {
        return boardService.getBoardList();
    }

    @PostMapping("/api/board/insert")
    @ResponseBody
    public String insertBoard(BoardEntity board) {
        String msg = "";
        board.setBoardType("normal");
        int result = boardService.insertBoard(board);
        if(result > 0){
            msg = "성공";
        }else{
            msg = "실패";
        }
        return msg;
    }
}