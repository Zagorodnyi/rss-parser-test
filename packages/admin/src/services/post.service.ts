import axios from 'axios';

import { EditablePost, SearchParams } from './types';

const base_url = 'http://localhost:5000';

const getHeaders = () => ({
  Authorization: localStorage.getItem('auth'),
});
export class PostService {
  static async getList(searchParams: SearchParams) {
    const res = await axios.get(`${base_url}/posts`, {
      params: searchParams,
    });

    return res.data;
  }

  static async getOneById(postId: number) {
    const res = await axios.get(`${base_url}/post/${postId}`);

    return res.data;
  }

  static async updateById(data: EditablePost, postId: number) {
    const res = await axios.put(`${base_url}/post/${postId}`, data, {
      headers: getHeaders(),
    });

    return res.data;
  }

  static async deleteById(postId: number) {
    const res = await axios.delete(`${base_url}/post/${postId}`, {
      headers: getHeaders(),
      data: {},
    });

    return res.data;
  }

  static async createOne(data: EditablePost) {
    const res = await axios.post(`${base_url}/post`, data, {
      headers: getHeaders(),
    });

    return res.data;
  }
}
