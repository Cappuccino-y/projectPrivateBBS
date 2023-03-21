const Course=({course}) => {
    return <>
      <h1>{course.name}</h1>
      {course.parts.map(course=><p key={course.id}>{course.name} {course.exercises}</p>)}
      <h2>total of {course.parts.reduce((total,cur)=> total+cur.exercises,0)} exercises</h2>
    </>
}

const Courses = ({courses}) => {

  return <>{courses.map(course=> <Course key={course.id} course={course} />)}</>
}

export default Courses