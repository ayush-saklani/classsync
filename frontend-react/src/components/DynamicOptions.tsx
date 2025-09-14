'use client'
import { useState, useEffect } from 'react';
import { options } from '@/utils/options';

// use these states in the parent component
// const [course, setCourse] = useState('');
// const [semester, setSemester] = useState('');
// const [section, setSection] = useState('');

export default function DynamicOptions({ course, semester, section, setCourse, setSemester, setSection, }: {
  course: string;
  semester: string;
  section: string;
  setCourse: (c: string) => void;
  setSemester: (s: string) => void;
  setSection: (s: string) => void;
}) {
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
        const sectionOptions = selectedCourse.sections[semester as keyof typeof selectedCourse.sections]?.map(s => ({ value: s, label: s })) || [];
        setSections(sectionOptions);
        if (sectionOptions.length > 0) {
          setSection(sectionOptions[0].value);
        }
      }
    }
  }, [course, semester]);


  return (
    <>
      <div className="container">
        <div className="row mt-3">
          <div className="col-md-4">
            <div className="col-sm-12 form-floating">
              <select className="form-select mb-3 text" name="course" id="course_option" value={course} onChange={e => setCourse(e.target.value)}>
                {courses.map(c => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
              <label htmlFor="course_option" className="heading-text">Course</label>
            </div>
          </div>
          <div className="col-md-4 col-sm-6">
            <div className="form-floating">
              <select className="form-select mb-3 text" name="semester" id="semester_option" value={semester} onChange={e => setSemester(e.target.value)}>
                {semesters.map(s => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
              <label htmlFor="semester_option" className="heading-text">Semester</label>
            </div>
          </div>
          <div className="col-md-4 col-sm-6">
            <div className="form-floating">
              <select className="form-select mb-3 text" name="section" id="section_option" value={section} onChange={e => setSection(e.target.value)}>
                {sections.map(s => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
              <label htmlFor="section_option" className="heading-text">Section</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
