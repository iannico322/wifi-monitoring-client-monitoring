import { useEffect, useState } from "react";

import Input from "./components/input/input";
function App() {
  // Define the key to use for storing data in localStorage
  const key = "database101";

  function create(item) {
    let data = JSON.parse(localStorage.getItem(key)) || [];
    data.push(item);
    localStorage.setItem(key, JSON.stringify(data));
  }

  function read() {
    let data = JSON.parse(localStorage.getItem(key)) || [];
    return data;
  }

  function update(index, newData) {
    let data = JSON.parse(localStorage.getItem(key)) || [];
    data[index] = newData;
    localStorage.setItem(key, JSON.stringify(data));
  }

  function deleteItem(index) {
    let data = JSON.parse(localStorage.getItem(key)) || [];
    data.splice(index, 1);
    localStorage.setItem(key, JSON.stringify(data));
  }

  // create({ name: 'John', age: 30 });

  let items = read();
  // console.log(items);
  // update(0, { name: 'Jane', age: 25 });
  // create({ name: 'John', age: 30 });
  // create({ name: 'John', age: 30 });
  // update(1, { name: 'nico', age: 25 });
  // deleteItem(1)

  const [data, setData] = useState([]);

  useEffect(() => {
    setData(read());
  }, []);




  const [userData, setUserData] = useState({
    name:"",
    device:"",
    date:""
  });

  const [euserData, esetUserData] = useState({
    name:"",
    device:"",
    date:"",
    status:""
  });
 

 
  const [editingIndex, setEditingIndex] = useState(null);


  function daysElapsed(dateString) {
    // Parse the input date string
    let inputDate = new Date(dateString);
    // Get the current date
    let currentDate = new Date();
    // Calculate the difference in time between the two dates
    let timeDiff = currentDate.getTime() - inputDate.getTime();
    // Calculate the number of days between the two dates
    let daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
    return daysDiff;
  }
  let currentDate = new Date();
let year = currentDate.getFullYear();
let month = currentDate.getMonth() + 1;
let day = currentDate.getDate();
let formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;



  return (
    <div className=" h-screen w-screen flex items-center justify-around  ">
      <form
        className=" min-w-[200px] w-[50%] max-w-[400px] flex flex-col gap-3  "
        onSubmit={(e) => {
          e.preventDefault();
          let date = new Date(userData.date);
          date.setMonth(date.getMonth() + 1)
          let newDateString = date.toISOString().slice(0, 10);
          create({
            ...userData,status:"Connected",dueDate:newDateString
          });
          setData(read());

          setUserData({
            name:"",
            device:"",
            date:""
          })
        }}
      >
        <Input
          placeholder="Name"
          value={userData.name}
          onChange={(e) => {
            setUserData({...userData, name: e.target.value});
          }}
        />
        <Input
          placeholder="Device Model"
          value={userData.device}
          onChange={(e) => {
            setUserData({...userData, device: e.target.value});
          }}
        />
        <Input
          placeholder="Date Started"
          type="date"
          value={userData.date}
          onChange={(e) => {
            setUserData({...userData, date: e.target.value});
          }}
        />
        <button>Create</button>
      </form>

      <div className=" w-[60%] py-10 px-5 flex flex-wrap gap-2  ">
        {data.map((e, key) => (
          <div className="min-w-[300px] min-h-[100px] flex flex-row items-center justify-between bg-[#80808031] px-5 py-4 gap-3 rounded-lg border-green-400 border-[1px] border-opacity-30">
            <div>
              {editingIndex === key ? (
                
                <div className="flex gap-3 flex-col">

                  <div className=" flex gap-3">
                  <Input
                  placeholder="Name"
                  value={euserData.name}
                  onChange={(e) => {
                    setUserData({...euserData, name: e.target.value});
                  }}
                />
            <Input
              placeholder="Device Model"
              value={euserData.device}
              onChange={(e) => {
                esetUserData({...euserData, device: e.target.value});
              }}
            />
                  </div>
                 
            <Input
              placeholder="Date Started"
              type="date"
              value={euserData.date}
              onChange={(e) => {
                esetUserData({...euserData, date: e.target.value});
              }}
            />
            <Input
              placeholder="Status"
              type="text"
              value={euserData.status}
              onChange={(e) => {
                esetUserData({...euserData, status: e.target.value});
              }}
            />
                </div>
              ) : (
                <>
                  <p key={key}>Name: <span className=" text-green-400">{e.name}</span> </p>
                  <p>Device Model: <span className=" text-green-400 uppercase">{e.device}</span> </p>
                  <p>Date Started: <span className=" text-green-400">{e.date}</span> </p>
                  {formattedDate > e.due?
                  
                  update(key,{...e,status:"Due"})
                  :update(key,{...e,status:"Connected"})}

                

               



                  <div>
                    <p>Status:<span className={e.status.toUpperCase()==="CONNECTED"?" text-green-400 ":" text-red-400"}>{e.status.toUpperCase()}</span> </p>
                    <p>Days Used: <span className=" text-green-400">{daysElapsed(e.date)} day</span> </p>
                  
                  
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center justify-start gap-2 h-full">
              {editingIndex === key ? (
                <>
                  <span
                    className="material-symbols-outlined cursor-pointer hover:text-green-400"
                    onClick={() => {
                      let date = new Date(euserData.date);
          date.setMonth(date.getMonth() + 1)
          let newDateString = date.toISOString().slice(0, 10);
          
                      update(key, {...euserData,dueDate:newDateString});
                      esetUserData({
                        name:"",
                        device:"",
                        date:"",
                        status:""
                      })
                      setEditingIndex(null);
                      setData(read());
                    }}
                  >
                    save
                  </span>

                  <span
                    className="material-symbols-outlined cursor-pointer p-1 hover:text-red-400"
                    onClick={() => {
                      esetUserData({
                        name:"",
                        device:"",
                        date:"",
                        status:""
                      })
                      setEditingIndex(null);
                    }}
                  >
                    close
                  </span>
                </>
              ) : (
                <>
                  <span
                    className="material-symbols-outlined cursor-pointer hover:text-green-400"
                    onClick={() => {
                      esetUserData({
                        name:e.name,
                        device:e.device,
                        date:e.date,
                        status:e.status
                      })
                      setEditingIndex(key);
                    }}
                  >
                    edit
                  </span>

                  <span
                    className="material-symbols-outlined cursor-pointer p-1 hover:text-red-400"
                    onClick={() => {

                      if (confirm(`Are you sure you want to Delete ${e.name}?`)) {
                        deleteItem(key);
                        setData(read());
                      } else {
                        
                      }
                      
                    }}
                  >
                    delete
                  </span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
