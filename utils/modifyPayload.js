export const modifyPayload=(values)=>{

    const obj = {...values}
    const data = JSON.stringify(obj);
    const formData = new FormData();
    formData.append('data', data);

    return formData;
 
}