import { useDynamicOptions } from '@/hooks/useDynamicOptions';

export default function DynamicOptions() {
  const {
    course,
    semester,
    section,
    courses,
    semesters,
    sections,
    setCourse,
    setSemester,
    setSection,
  } = useDynamicOptions();

  return (
    <div className="row">
      <div className="col-md-4">
        <select className="form-select" value={course} onChange={e => setCourse(e.target.value)}>
          {courses.map(c => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
      </div>
      <div className="col-md-4">
        <select className="form-select" value={semester} onChange={e => setSemester(e.target.value)}>
          {semesters.map(s => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>
      <div className="col-md-4">
        <select className="form-select" value={section} onChange={e => setSection(e.target.value)}>
          {sections.map(s => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
