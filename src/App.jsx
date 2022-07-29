import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Button, Modal } from "rsuite";
import { useForm } from "./hooks/useForm";
import { Link } from "react-router-dom";
import { baseUrl } from "./api/requets";

const App = () => {

  const [students, setStudents] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [ updateModal, setUpdateModal ] = useState(false);
  const [ student, setStudent ] = useState({});
  
  const [ formValues, handleInputChange, reset ] = useForm({
    name:"",
    lastname:"",
    age:"",
    date_of_birth:"",
    date_of_inscription:""
  })

  const {
    name,
    lastname,
    age,
    date_of_birth,
    date_of_inscription
  } = formValues;

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/students")
      .then((res) => res.json())
      .then((data) => setStudents(data));
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:8000/api/students/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          /*  .then(res => console.log(res)) */
          .then((data) => {
            setStudents(students.filter((student) => student.id !== id));
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          })
          .catch((err) => console.log(err));
      }
    });
    
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const handleOpen = () => {
    setOpenModal(true);
  }



  const saveStudent = async(data)=>{

    const resp = await fetch(baseUrl, {
        method:'POST',
        headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data)
    })

    const body = await resp.json()

    
    if(body.ok){
        Swal.fire('Success', 'Studen saved', 'success')
        setStudents([...students, body.student]);
        setOpenModal(false);

    }else{
     
        Swal.fire('Error', body.error, 'error')
    }

}

  const handleSubmit = (e) => {
    e.preventDefault();
    if(age < 18){
    return  Swal.fire({
        title: "Error",
        text: "Age must be greater than 18",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
    /* fetch("http://localhost:8000/api/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        lastname,
        age,
        date_of_birth,
        date_of_inscription,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setStudents([...students, data]);
        setOpenModal(false);
        reset()
      }
      ).catch((err) => console.log(err));
      reset() */
      

      saveStudent(formValues)
      reset()
  }

  


  return (
    
    <div className="container mt-5 shadow">
      <Modal
        open={openModal}
        onClose={closeModal}
        style={{ marginTop: "150px !important" }}
      >
        <Modal.Header>
          <Modal.Title>Create new Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="form-group" onSubmit={ handleSubmit }>
            <div className="from-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleInputChange}
                className="form-control"
                palceholder="Name"
              />
            </div>
            <div className="from-group">
              <label>Lastname</label>
              <input
                type="text"
                name="lastname"
                value={lastname}
                onChange={handleInputChange}
                className="form-control my-1"
                palceholder="Lastname"
              />
            </div>
            <div className="from-group">
              <label>Age</label>
              <input
                type="number"
                name="age"
                value={age}
                onChange={handleInputChange}
                className="form-control my-1"
                palceholder="Age"
              />
            </div>
            <div className="from-group">
              <label>Date of birth</label>
              <input
                type="date"
                name="date_of_birth"
                value={date_of_birth}
                onChange={handleInputChange}
                className="form-control my-1"
                palceholder="Date of birth"
              />
            </div>
            <div className="from-group">
              <label>Date of inscription</label>
              <input
                type="date"
                name="date_of_inscription"
                value={date_of_inscription}
                onChange={handleInputChange}
                className="form-control my-1"
                palceholder="Date of inscription"
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block mt-3">
              Save
            </button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeModal} appearance="subtle">Cancel</Button>
        </Modal.Footer>
      </Modal>
      <div className="p-5">
        <h2 className="text-center">All Students</h2>
        <div className="my-3">
          <button className="btn btn-outline-success" onClick={handleOpen}>
            Add New Student
          </button>
        </div>
        <hr />
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Lastname</th>
              <th>Age</th>
              <th>Date of Birtday</th>
              <th>Date of inscription</th>
              <th>Cost</th>
              <th colSpan="2"></th>
            </tr>
          </thead>
          <tbody>
            {students?.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.lastname}</td>
                <td> {student.age} </td>
                <td>{student.date_of_birth}</td>
                <td>{student.date_of_inscription}</td>
                <td>$ {student.cost}</td>
                <th width="10px">
                  <Link to={ `student/${student.id}` } className="btn btn-outline-info" onClick= { ()=>handleEdit(student.id) }>Edit</Link>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => handleDelete(student.id)}
                  >
                    Delete
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
  );
};

export default App;
