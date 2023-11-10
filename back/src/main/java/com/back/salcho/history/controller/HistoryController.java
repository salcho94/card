package com.back.salcho.history.controller;

import com.back.salcho.board.entity.BoardEntity;
import com.back.salcho.board.service.BoardService;
import com.back.salcho.history.entity.HistoryEntity;
import com.back.salcho.history.service.HistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class HistoryController {

    @Autowired
    HistoryService historyService;

    @GetMapping("/api/getHistory")
    @ResponseBody
    public List<HistoryEntity> historyList() {
        return historyService.getHistory();
    }

    @PostMapping("/api/historyLike")
    @ResponseBody
    public String insertHistoryLike(HistoryEntity history) {
        String msg = "";
        int result = historyService.insertLike(history);
        if(result > 0){
            msg = "성공";
        }else{
            msg = "실패";
        }
        return msg;
    }

    @PostMapping("/api/addReview")
    @ResponseBody
    public int insertComment(HistoryEntity history) {
        System.out.println("여기탐!"+history.getReview());
        int result = historyService.insertComment(history);
        return result;
    }

}