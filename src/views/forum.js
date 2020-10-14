import React, { useEffect, useState } from 'react';

import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import { useParams } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';

const Forum = () => {

    const id = useParams().id; //forum id

    const [forum, setForum] = useState({
        _id: String,
        createdAt: Date,
        name: String,
        posts: [{
            _id: String,
            title: String,
            content: String,
            userCreator: String,
            comments:[]

        }],
        userCreator: String
    })


    useEffect(() => {
        axios.get("http://52.200.134.90:3000/forums/" + id).then((res) => {
            const forumData = res.data[0];
            setForum(forumData)
            //setForums(forumList)
        })
            .catch((error) => {
                console.log(error);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    console.log(forum)

    return (
        <Card style={{ margin: '10%' }}>
            <h1>{forum.name}</h1>
            <p>{forum.userCreator}</p>
            <ListGroup>
                {forum.posts.map((post, index) =>
                    <ListGroup.Item key={index} action variant="light">
                        {post.title}
                        <p>{post.content}</p>
                    </ListGroup.Item>
                )}
            </ListGroup>
        </Card>
    )
}
export default Forum;
