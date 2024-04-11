import { Button, Form, Input } from "antd"
import styles from './commentForm.module.css'
import { baseURL } from "../../constants";
import { notification } from 'antd';

export const CommentForm = ({ id }) => {

    const [form] = Form.useForm();
    const [api, contextHolder] = notification.useNotification();

    const onAddComment = async ({ comment }) => {
        try {
            const url = `${baseURL}api/features/${id}/comments`;
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ body: comment })
            });
            const jsonData = await response.json();
            if (!response.ok) {
                throw new Error(jsonData.error);
            }
            api.success({
                message: 'Success',
                description: jsonData.message,
            });
            form.resetFields()
        } catch (err) {
            api.error({
                message: 'Error',
                description: err.message,
            });
        }
    }

    return (
        <>
            {contextHolder}
            <Form
                layout="vertical"
                className={styles.formContainer}
                onFinish={onAddComment}
                form={form}
            >
                <Form.Item
                    name='comment'
                    label={'Add a comment:'}
                    style={{ marginBottom: 20 }}
                >
                    <Input.TextArea
                        placeholder="Type here..."
                        rows={4}
                    />
                </Form.Item>
                <Form.Item className={styles.sendButton}>
                    <Button type="primary" htmlType="submit">
                        Send
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}
