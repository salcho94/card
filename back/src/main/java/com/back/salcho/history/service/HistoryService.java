package com.back.salcho.history.service;


import com.back.salcho.history.entity.HistoryEntity;

import java.util.List;

public interface HistoryService {
    public List<HistoryEntity> getHistory();

    public int insertLike(HistoryEntity history);

    public int insertComment(HistoryEntity history);

}
