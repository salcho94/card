package com.back.salcho.wishlist.service;


import com.back.salcho.wishlist.entity.WishListEntity;
import com.back.salcho.wishlist.mapper.WishListMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class WishListServiceImpl implements WishListService {
    @Autowired
    private WishListMapper wishListMapper;
    @Override
    public List<Map<String, String>> getWishCode() {
        return wishListMapper.getWishCode();
    }

    @Override
    public int insertWishItem(WishListEntity wishListEntity) {
        return wishListMapper.insertWishItem(wishListEntity);
    }

    @Override
    public List<Map<String, Object>> getWishList(WishListEntity wishListEntity) {
        return wishListMapper.getWishList(wishListEntity);
    }

}
