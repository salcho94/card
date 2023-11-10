package com.back.salcho.history.service;


import com.back.salcho.board.entity.BoardEntity;
import com.back.salcho.history.entity.HistoryEntity;
import com.back.salcho.history.mapper.HistoryMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HistoryServiceImpl implements HistoryService {
    @Autowired
    HistoryMapper historyMapper;
    @Override
    public List<HistoryEntity> getHistory() {
        return historyMapper.getHistory();
    }

    @Override
    public int insertLike(HistoryEntity history){
        return historyMapper.insertLike(history);
    }

    @Override
    public int insertComment(HistoryEntity history){
        return historyMapper.insertComment(history);
    }

}
