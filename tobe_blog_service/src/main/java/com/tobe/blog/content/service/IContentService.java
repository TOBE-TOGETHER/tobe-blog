package com.tobe.blog.content.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tobe.blog.beans.dto.content.BaseContentCreationDTO;
import com.tobe.blog.beans.dto.content.BaseContentDTO;
import com.tobe.blog.beans.dto.content.BaseContentUpdateDTO;
import com.tobe.blog.beans.dto.content.BaseSearchFilter;
import com.tobe.blog.beans.entity.content.BaseContentEntity;
import com.tobe.blog.content.mapper.BaseContentMapper;

public interface IContentService<
    D extends BaseContentDTO, 
    C extends BaseContentCreationDTO, 
    U extends BaseContentUpdateDTO, 
    E extends BaseContentEntity, 
    M extends BaseContentMapper<D, E>> {

    D save(C creationDTO);

    D update(U updateDTO);

    void delete(String id);

    Page<D> search(int current, int size, BaseSearchFilter filter);

    D getDTOById(String id);

    D getDTOByIdAndCount(String id);

    D release(String id);

}