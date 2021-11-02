/* eslint-disable */
import * as types from './mutations-type'
import { playMode } from '@/common/playConfig'
import { saveSearch, saveHistory, clearHistory, deleteHistory } from '@/common/cache'
import utils from '@/utils'

// 保存搜索历史
export const saveSearchHistory = function ({ commit }, query) {
    commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}

function findIndex_in_random(list, song) {
    return list.findIndex((item) => {
        item.id === song.id
    })
}

// 选择播放
export const selectPlay = function ({ commit, state }, { list, index }) {
    commit(types.SET_SEQUENCE_LIST, list)
    if (state.mode === playMode.random) {
        let random_list = utils.shuffle(list)
        commit(types.SET_PLAYLIST, random_list)
        index = findIndex_in_random(random_list, list(index))
    } else {
        commit(types.SET_PLAYLIST, list)
    }
    commit(types.SET_CURRENT_INDEX, index)
    commit(types.SET_PLAYING_STATE, true)
}

export const playAll = function ({ commit }, { list }) {
    console.log(list)
    commit(types.SET_PLAY_MODE, playMode.sequence)
    commit(types.SET_SEQUENCE_LIST, list)
    commit(types.SET_PLAYLIST, list)
    commit(types.SET_CURRENT_INDEX, 0)
    commit(types.SET_PLAYING_STATE, true)
}

// 暂停播放
export const pausePlay = function ({ commit }) {
    commit(types.SET_PLAYING_STATE, false)
}

// 设置最近播放歌曲
export const saveHistoryList = function ({ commit }, song) {
    commit(types.SET_HISTORY_LIST, saveHistory(song))
}

// 移除最近播放歌曲单个
export const deleteHistoryList = function ({ commit }, song) {
    commit(types.SET_HISTORY_LIST, deleteHistory(song))
}

// 移除全部最近播放
export const clearHistoryList = function ({ commit }) {
    commit(types.SET_HISTORY_LIST, clearHistory())
}
