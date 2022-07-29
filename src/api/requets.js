import Swal from "sweetalert2";

 export const baseUrl = 'http://127.0.0.1:8000/api/students';

export const saveStudent = async(data)=>{

    const resp = await fetch(baseUrl, {
        method:'POST',
        headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data)
    })

    const body = await resp.json()

    console.log(body)
    if(body.ok){
        Swal.fire('Success', 'Studen saved', 'success')
        return body.student
    }else{
        Swal.fire('Error', body.error, 'error')
    }

}