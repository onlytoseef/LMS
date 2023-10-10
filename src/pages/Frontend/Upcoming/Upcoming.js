import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore/lite";
import { firestore } from "../../../config/firebase";
import { useAuthContext } from "../../../context/AuthContext";
import Todo from "../../components/Todo";
import dayjs from "dayjs";
import {UsergroupAddOutlined,AreaChartOutlined,ProfileOutlined} from  "@ant-design/icons";


export default function Upcoming() {
    const [documents, setDocuments] = useState([])
    const { user } = useAuthContext()
    const [isProcessing, setIsProcessing] = useState(false);
    const date = new Date()
    const title = "DASHBOARD"
    const currentDate = dayjs(date).format("YYYY-MM-DD")
    const getData = async () => {
        try {
            setIsProcessing(true)
            const q = query(collection(firestore, "todos"), where("createdBy.uid", "==", user.createdBy.uid), where("date", ">", currentDate));

            const querySnapshot = await getDocs(q);
            const array = []
            querySnapshot.forEach((doc) => {
                const data = doc.data()
                array.push(data)
            });
            setDocuments(array)
        }
        catch (error) {
            console.error(error);
        }
        setIsProcessing(false)
    }
    useEffect(() => {
        getData();
    }, []);

    return (
        < >
         <h1 className="sideFont" >DASHBOARD</h1>
         <div className="container">
            <div className="row mt-5">
                <div className="col-12 col-md-6 bg-primary text-white py-4  rounded"><h3 className="sideFont"> <UsergroupAddOutlined /> Students</h3></div>
                <div className="col-12 col-md-6 bg-info text-white py-4 rounded "><h3 className="sideFont" ><AreaChartOutlined />Courses</h3></div>
            </div>
            <div className="row mt-5">
                <div className="col-12 col-md-6 bg-primary text-white py-4 rounded"><h3 className="sideFont"> <ProfileOutlined /> Attendance</h3></div>
            </div>
         </div>
        </>
    );
}