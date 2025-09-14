'use client'
import { useState, useEffect } from 'react';
import { options } from '@/utils/options';

export function useDynamicOptions() {
  const [course, setCourse] = useState('');
  const [semester, setSemester] = useState('');
  const [section, setSection] = useState('');

  const [courses, setCourses] = useState<{ value: string; label: string }[]>([]);
  const [semesters, setSemesters] = useState<{ value: string; label: string }[]>([]);
  const [sections, setSections] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    const courseOptions = options.courses.map(course => ({
      value: course.course_id,
      label: course.course_name,
    }));
    setCourses(courseOptions);
    if (courseOptions.length > 0) {
      setCourse(courseOptions[0].value);
    }
  }, []);

  useEffect(() => {
    if (course) {
      const selectedCourse = options.courses.find(c => c.course_id === course);
      if (selectedCourse) {
        const firstSem = options.curr_term === 'odd' ? 1 : 2;
        const semesterOptions = [];
        for (let i = firstSem; i <= selectedCourse.total_sem; i += 2) {
          semesterOptions.push({ value: i.toString(), label: i.toString() });
        }
        setSemesters(semesterOptions);
        if (semesterOptions.length > 0) {
          setSemester(semesterOptions[0].value);
        }
      }
    }
  }, [course]);

  useEffect(() => {
    if (course && semester) {
      const selectedCourse = options.courses.find(c => c.course_id === course);
      if (selectedCourse) {
        const sectionOptions = selectedCourse.sections[semester].map(s => ({ value: s, label: s }));
        setSections(sectionOptions);
        if (sectionOptions.length > 0) {
          setSection(sectionOptions[0].value);
        }
      }
    }
  }, [course, semester]);

  return {
    course,
    semester,
    section,
    courses,
    semesters,
    sections,
    setCourse,
    setSemester,
    setSection,
  };
}
