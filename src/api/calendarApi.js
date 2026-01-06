import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/calendar';

export const calendarApi = {
    // 일정 조회
    getEvents: (startDate, endDate) => {
        return axios.get(`${API_BASE_URL}/events`, {
            params: {
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString()
            }
        });
    },

    // 일정 등록
    createEvent: (eventData) => {
        return axios.post(`${API_BASE_URL}/events`, eventData);
    },

    // 일정 수정
    updateEvent: (eventId, eventData) => {
        return axios.put(`${API_BASE_URL}/events/${eventId}`, eventData);
    },

    // 일정 삭제
    deleteEvent: (eventId) => {
        return axios.delete(`${API_BASE_URL}/events/${eventId}`);
    }
};