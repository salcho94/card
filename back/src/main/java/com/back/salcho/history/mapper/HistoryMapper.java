package com.back.salcho.history.mapper;

import com.back.salcho.board.entity.BoardEntity;
import com.back.salcho.history.entity.HistoryEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface HistoryMapper {
    List<HistoryEntity> getHistory();

    Integer insertLike(HistoryEntity history);

    Integer insertComment(HistoryEntity history);

}
