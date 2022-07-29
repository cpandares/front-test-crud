import React, { useEffect, useState } from "react";
import { useParams, Link,useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import { baseUrl } from "../api/requets";


const UserDetail = () => {
  const { id } = useParams();
  const [student, setStudent] = useState({});
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/students/${id}`)
      .then((res) => res.json())
      .then((data) => setStudent(data));
  }, [id]);

  const onChange = e => {
    let { name, value } = e.target;
    let data = { ...student };
    data[name] = value;
    setStudent(data);
  }

  const saveStudent = async(data)=>{

    const resp = await fetch(baseUrl + '/' + data.id, {
        method:'POST',
        headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data)
    })

    const body = await resp.json()

    
    if(body.ok){
        Swal.fire({
            title: "Success",
            text: "Student updated successfully",
            icon: "success",
            confirmButtonText: "Ok",
          }).then((result)=>{
              navigate('/')
          })

    }else{
     
        Swal.fire('Error', body.error, 'error')
    }

}

  const handleUpdate = (e) => {
    e.preventDefault();
    var data = {
        ...student,
       
      }

      
    if (data.age < 18) {
      return Swal.fire({
        title: "Error",
        text: "Age must be greater than 18",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
    /* fetch(`http://localhost:8000/api/students/${student.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        
        Swal.fire({
          title: "Success",
          text: "Student updated successfully",
          icon: "success",
          confirmButtonText: "Ok",
        }).then((result)=>{
            navigate('/')
        })
      })
      .catch((err) => console.log(err)); */

      saveStudent(data)
  
  };

  return (
    <div className="card mt-5 container">
        <Link to="/" className="btn btn-primary btn-sm my-2">
            Back to students
        </Link>
      <form className="form-group" onSubmit={handleUpdate}>
        <input type="hidden" name="_method" value="PUT" />
        <div className="from-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={student.name}
            onChange={onChange.bind(this)} 
            className="form-control"
            palceholder="Name"
          />
        </div>
        <div className="from-group">
          <label>Lastname</label>
          <input
            type="text"
            name="lastname"
            value={student.lastname}
            onChange={onChange.bind(this)} 
            className="form-control my-1"
            palceholder="Lastname"
          />
        </div>
        <div className="from-group">
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={ parseInt(student.age) }
            onChange={onChange.bind(this)} 
            className="form-control my-1"
            palceholder="Age"
          />
        </div>
        <div className="from-group">
          <label>Date of birth</label>
          <input
            type="date"
            name="date_of_birth"
            value={student.date_of_birth}
            onChange={onChange.bind(this)} 
            className="form-control my-1"
            palceholder="Date of birth"
          />
        </div>
        <div className="from-group">
          <label>Date of inscription</label>
          <input
            type="date"
            name="date_of_inscription"
            value={student.date_of_inscription}
            onChange={onChange.bind(this)} 
            className="form-control my-1"
            palceholder="Date of inscription"
          />
        </div>
        <div className="from-group">
          <label>Name</label>
          <input
            type="text"
            name="cost"
            value={student.cost}
            onChange={onChange.bind(this)} 
            className="form-control"
            palceholder="Name"
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block mt-3">
          Save
        </button>
      </form>
    </div>
  );
};

export default UserDetail;
