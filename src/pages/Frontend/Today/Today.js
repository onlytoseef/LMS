import React, { useState,useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Card, Modal, message, Input, Select, Button, Form, DatePicker, ColorPicker, Typography, } from "antd";
import { AiOutlinePlus } from "react-icons/ai";
import { doc, setDoc } from "firebase/firestore/lite";
import { firestore } from "../../../config/firebase";
import ShowTask from "../../Dashboard/ShowTask";
import { useAuthContext } from "../../../context/AuthContext";
import courses from "pages/components/courses";
import { getFirestore } from 'firebase/firestore/lite'




export default function AddTask() {


    const { user } = useAuthContext();
    const { Title } = Typography;
    const [date, setDate] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [addTodo, setAddTodo] = useState({});
    const [document,setDocument] = useState({})

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleDate = (_, date) => {
        setDate(date);
    };
    const handleFinish = async (values) => {
        const {
            courseName,
           courseDuration,
           CourseDescription,
           CourseId,
            
        } = values;

        const BachaId = Math.random().toString(36).slice(2);
        const courses = {
            courseName,
            courseDuration,
            CourseDescription,
            CourseId,


            id: BachaId,
            createdBy: {
                email: user.createdBy.email,
                uid: user.createdBy.uid,
                fullname: user.fullname,
            },
        };

        try {
            setIsLoading(true);
            await setDoc(doc(firestore, "courses", courses.id), courses);
            setAddTodo(courses);
            message.success("Course has been added successfully");
        }
        catch (error) {
            console.error(error);
            message.error("Something went wrong while adding Course ");
        }

        setIsLoading(false);
        setIsModalOpen(false);
    };
    const handleFinishFailed = () => {
        message.error("Something went wrong while adding Student Information");
    };


    const readDocument =async() => {
       

    }
useEffect(()=>{
    readDocument()
},[readDocument])
    
    return (
        <>
            <div className="container-fluid rounded-lg " >
                <div className="row  " >
                    <div className="col " >
                        <h1 className="mt-3 mb-4" > Courses  </h1>
                        <Button  onClick={showModal} >Add New Course</Button>
                    
                        

                        <Modal open={isModalOpen} onCancel={() => { setIsModalOpen(false); }} onOk={() => { setIsModalOpen(false); }} >
                            <Form layout="vertical" onFinish={handleFinish} onFinishFailed={handleFinishFailed} >
                                <Title level={2}>
                                    Add New Course
                                </Title>
                                <div className="d-flex justify-content-between">


                                </div>
                                <Form.Item name="courseName"
                                    rules={
                                        [{
                                            required: true,
                                            min: 5,
                                            message: "Course Name Must Contain atlaeast 5 Letters",
                                        },]
                                    }
                                    hasFeedback >
                                    <Input name="courseName" placeholder="Enter Course Name" />
                                </Form.Item>
                                <Form.Item name="CourseId"

                                    hasFeedback >
                                    <Input name="CourseId" placeholder="Enter Course ID" />
                                </Form.Item>
                                <Form.Item name="courseDuration"

                                    hasFeedback >
                                    <Input name="courseDuration" placeholder="Enter Course Duration" />
                                </Form.Item>
                                <Form.Item name="CourseDescription"

                                    hasFeedback >
                                    <Input name="CourseDescription" placeholder="Enter Course Description" />
                                </Form.Item>

                             

                                <Form.Item className="text-center" >
                                    <Button type="primary" className="w-25" loading={isLoading} disabled={isLoading} htmlType="submit" >
                                        Add Course
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Modal>
                    </div>
                </div>
            </div>
        </>
    );
}