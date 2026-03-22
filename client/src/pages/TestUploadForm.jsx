import React, { useState } from 'react';
import axios from 'axios';

const TestUploadForm = () => {
  const [paperCode, setPaperCode] = useState('');
  const [paperName, setPaperName] = useState('');
  const [level, setLevel] = useState('');
  const [questionSet, setQuestionSet] = useState([
    {
      questionNo: 1,
      questionBody: '',
      options: { A: '', B: '', C: '', D: '' },
      selected: '',
      answer: '',
      belongsTo: '',
      marks: 1
    }
  ]);

  const BASE_URL = import.meta.env.VITE_API_URL;

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questionSet];
    updated[index][field] = value;
    setQuestionSet(updated);
  };

  const handleOptionChange = (qIndex, key, value) => {
    const updated = [...questionSet];
    updated[qIndex].options[key] = value;
    setQuestionSet(updated);
  };

  const addQuestion = () => {
    setQuestionSet([
      ...questionSet,
      {
        questionNo: questionSet.length + 1,
        questionBody: '',
        options: { A: '', B: '', C: '', D: '' },
        selected: '',
        answer: '',
        belongsTo: '',
        marks: 1
      }
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      paperCode,
      paperName,
      level,
      totalQuestions: questionSet.length,
      questionSet
    };
   try {
  const res = await fetch(`${BASE_URL}/api/questionset/upload`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload),
    credentials: 'include'
  });

  if (res.ok) {
    alert('Test uploaded successfully!');
  } else {
    const errorData = await res.json();
    alert(`Upload failed: ${errorData.error || 'Unknown error'}`);
  }
} catch (err) {
  console.error('Network error:', err);
  alert('Upload failed due to network error');
}
  }

  return (
    <div className='w-full  flex justify-center items-center'>
    <form onSubmit={handleSubmit} style={{ width: '80%', maxWidth: '800px',marginTop:'120px' }}>
      <h2>Create New Question Set</h2>

      <input
        type="text"
        placeholder="Paper Code"
        value={paperCode}
        onChange={(e) => setPaperCode(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Paper Name"
        value={paperName}
        onChange={(e) => setPaperName(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Level (beginner/medium/difficult)"
        value={level}
        onChange={(e) => setLevel(e.target.value)}
        required
      />

      {questionSet.map((q, qIndex) => (
        <div key={qIndex} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
          <h4>Question {q.questionNo}</h4>

          <input
            type="text"
            placeholder="Question Body"
            value={q.questionBody}
            onChange={(e) => handleQuestionChange(qIndex, 'questionBody', e.target.value)}
            required
          />

          {['A', 'B', 'C', 'D'].map((key) => (
            <input
              key={key}
              type="text"
              placeholder={`Option ${key}`}
              value={q.options[key]}
              onChange={(e) => handleOptionChange(qIndex, key, e.target.value)}
              required
            />
          ))}

          <input
            type="text"
            placeholder="Correct Answer (A/B/C/D)"
            value={q.answer}
            onChange={(e) => handleQuestionChange(qIndex, 'answer', e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Belongs To (Topic)"
            value={q.belongsTo}
            onChange={(e) => handleQuestionChange(qIndex, 'belongsTo', e.target.value)}
          />

          <input
            type="number"
            placeholder="Marks"
            value={q.marks}
            onChange={(e) => handleQuestionChange(qIndex, 'marks', parseInt(e.target.value))}
            min={1}
          />
        </div>
      ))}

      <button type="button" onClick={addQuestion}>Add Another Question</button>
      <button type="submit">Upload Question Set</button>
    </form>
    </div>
  );
};

export default TestUploadForm;