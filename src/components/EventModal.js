import React, { useState, useEffect } from 'react';
import './EventModal.css';

const EventModal = ({ date, event, onSave, onDelete, onClose }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        color: '#3788d8'
    });

    useEffect(() => {
        if (event) {
            setFormData({
                title: event.title,
                description: event.description || '',
                startDate: formatDateTimeLocal(new Date(event.startDate)),
                endDate: formatDateTimeLocal(new Date(event.endDate)),
                color: event.color
            });
        } else if (date) {
            const start = new Date(date);
            start.setHours(9, 0);
            const end = new Date(date);
            end.setHours(10, 0);

            setFormData({
                ...formData,
                startDate: formatDateTimeLocal(start),
                endDate: formatDateTimeLocal(end)
            });
        }
    }, [event, date]);

    const formatDateTimeLocal = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const eventData = {
            ...formData,
            startDate: new Date(formData.startDate).toISOString(),
            endDate: new Date(formData.endDate).toISOString()
        };

        onSave(eventData);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>{event ? '일정 수정' : '새 일정'}</h2>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>제목</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>설명</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="3"
                        />
                    </div>

                    <div className="form-group">
                        <label>시작 시간</label>
                        <input
                            type="datetime-local"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>종료 시간</label>
                        <input
                            type="datetime-local"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>색상</label>
                        <input
                            type="color"
                            name="color"
                            value={formData.color}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="modal-buttons">
                        <button type="submit" className="btn-save">저장</button>
                        {event && (
                            <button
                                type="button"
                                className="btn-delete"
                                onClick={() => onDelete(event.id)}
                            >
                                삭제
                            </button>
                        )}
                        <button type="button" className="btn-cancel" onClick={onClose}>
                            취소
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EventModal;