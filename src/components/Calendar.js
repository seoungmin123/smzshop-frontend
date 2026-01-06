import React, { useState, useEffect } from 'react';
import { calendarApi } from '../api/calendarApi';
import { useNavigate } from 'react-router-dom';
import EventModal from './EventModal';
import './Calendar.css';

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const navigate = useNavigate();

    // 월 시작일/종료일 계산
    const getMonthRange = (date) => {
        const start = new Date(date.getFullYear(), date.getMonth(), 1);
        const end = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59);
        return { start, end };
    };

    // 일정 조회
    const fetchEvents = async () => {
        try {
            const { start, end } = getMonthRange(currentDate);
            console.log('📅 조회 범위:', start, end)

            const response = await calendarApi.getEvents(start, end);
            console.log('📊 서버 응답:', response); // ← 추가
            console.log('📋 받은 일정 데이터:', response.data); // ← 추가

            setEvents(response.data);
        } catch (error) {
            console.error('일정 조회 실패:', error);
            console.error('에러 상세:', error.response); // ← 추가
        }
    };

    useEffect(() => {
        fetchEvents();
    }, [currentDate]);

    // 캘린더 날짜 생성
    const generateCalendarDays = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        const firstDayOfWeek = firstDay.getDay();
        const daysInMonth = lastDay.getDate();

        const days = [];

        // 이전 달 날짜
        for (let i = 0; i < firstDayOfWeek; i++) {
            days.push(null);
        }

        // 현재 달 날짜
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(new Date(year, month, i));
        }

        return days;
    };

    // 날짜별 일정 필터링
    const getEventsForDate = (date) => {
        if (!date) return [];

        const filtered = events.filter(event => {
            const eventStart = new Date(event.startDate);
            const eventEnd = new Date(event.endDate);

            const dateStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            const dateEnd = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);

            return (eventStart <= dateEnd && eventEnd >= dateStart);
        });

        console.log(`📆 ${date.toLocaleDateString()}의 일정:`, filtered); // ← 추가
        return filtered;
    };

    // 날짜 클릭
    const handleDateClick = (date) => {
        setSelectedDate(date);
        setSelectedEvent(null);
        setShowModal(true);
    };

    // 일정 클릭
    const handleEventClick = (event, e) => {
        e.stopPropagation();
        setSelectedEvent(event);
        setShowModal(true);
    };

    // 일정 저장
    const handleSaveEvent = async (eventData) => {
        try {
            if (selectedEvent) {
                await calendarApi.updateEvent(selectedEvent.id, eventData);
            } else {
                await calendarApi.createEvent(eventData);
            }
            fetchEvents();
            setShowModal(false);
        } catch (error) {
            console.error('일정 저장 실패:', error);
        }
    };

    // 일정 삭제
    const handleDeleteEvent = async (eventId) => {
        try {
            await calendarApi.deleteEvent(eventId);
            fetchEvents();
            setShowModal(false);
        } catch (error) {
            console.error('일정 삭제 실패:', error);
        }
    };

    // 이전/다음 달
    const changeMonth = (offset) => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
    };

    const calendarDays = generateCalendarDays();


    return (
        <div className="calendar-container">
            <button onClick={() => navigate('/dashboard')} style={{marginBottom: '10px'}}>
                대시보드 바로가기
            </button>

            <div className="calendar-header">
                <button onClick={() => changeMonth(-1)}>◀</button>
                <h2>{currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월</h2>
                <button onClick={() => changeMonth(1)}>▶</button>
            </div>

            <div className="calendar-weekdays">
                {['일', '월', '화', '수', '목', '금', '토'].map(day => (
                    <div key={day} className="weekday">{day}</div>
                ))}
            </div>

            <div className="calendar-grid">
                {calendarDays.map((date, index) => {
                    const dayEvents = date ? getEventsForDate(date) : [];
                    const isToday = date &&
                        date.toDateString() === new Date().toDateString();

                    return (
                        <div
                            key={index}
                            className={`calendar-day ${!date ? 'empty' : ''} ${isToday ? 'today' : ''}`}
                            onClick={() => date && handleDateClick(date)}
                        >
                            {date && (
                                <>
                                    <div className="day-number">{date.getDate()}</div>
                                    <div className="day-events">
                                        {dayEvents.slice(0, 3).map(event => (
                                            <div
                                                key={event.id}
                                                className="event-item"
                                                style={{ backgroundColor: event.color }}
                                                onClick={(e) => handleEventClick(event, e)}
                                            >
                                                {event.title}
                                            </div>
                                        ))}
                                        {dayEvents.length > 3 && (
                                            <div className="more-events">+{dayEvents.length - 3} more</div>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    );
                })}
            </div>

            {showModal && (
                <EventModal
                    date={selectedDate}
                    event={selectedEvent}
                    onSave={handleSaveEvent}
                    onDelete={handleDeleteEvent}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    );
};

export default Calendar;