import * as api from '../api';
import {
    FETCH_ALL,
    FETCH_BY_SEARCH,
    CREATE_PROJECT,
    UPDATE_PROJECT,
    DELETE_PROJECT,
    SET_CANDIDATE,
    REMOVE_CANDIDATE,
} from '../constants/actionTypes';

export const getProjects = () => async (dispatch) => {
    try {
        const { data } = await api.fetchProjects();
        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error);
    }
};
export const getProjectsBySearch = (searchQuery) => async (dispatch) => {
    try {
        const {
            data: { data },
        } = await api.fetchProjectsBySearch(searchQuery);
        dispatch({ type: FETCH_BY_SEARCH, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const createProject = (project) => async (dispatch) => {
    try {
        const { data } = await api.createProject(project);
        dispatch({ type: CREATE_PROJECT, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const updateProject = (id, project) => async (dispatch) => {
    try {
        console.log(project);
        const { data } = await api.updateProject(id, project);
        dispatch({ type: UPDATE_PROJECT, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const deleteProject = (id) => async (dispatch) => {
    try {
        // response data = response.data
        await api.deleteProject(id);
        dispatch({ type: DELETE_PROJECT, payload: id });
    } catch (error) {
        console.log(error);
    }
};

export const applyProject = (id) => async (dispatch) => {
    try {
        // response data = response.data
        const { data } = await api.applyProject(id);
        dispatch({ type: UPDATE_PROJECT, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const selectCandidate =
    (candidateEmail, projectId) => async (dispatch) => {
        try {
            const { data } = await api.selectCandidate(
                candidateEmail,
                projectId
            );
            dispatch({ type: SET_CANDIDATE, payload: data });
        } catch (error) {
            console.log(error);
        }
    };

export const removeCandidate =
    (candidateEmail, projectId) => async (dispatch) => {
        try {
            const { data } = await api.removeCandidate(
                candidateEmail,
                projectId
            );
            dispatch({ type: REMOVE_CANDIDATE, payload: data });
        } catch (error) {
            console.log(error);
        }
    };
