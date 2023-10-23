import c from '../../Home/css/home.module.css'
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react'
import Chat from '../../Messages/components/Chat'

const Repost = ({ setIsReposts, isReposts, setCommentsItem, commentsItem }) => {
	let [userMess, setUserMess] = useState(false)
	const temp = jwtDecode(localStorage.getItem('user'))
	useEffect(() => {
		console.log('123')
		const api = async () => {

			const responceI = await fetch('http://localhost:5000/api/user/getMessages', {
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify({ id: temp.id })
			})
			const data = await responceI.json()
			setUserMess(userMess = data)
			console.log(userMess)
			console.log(data)
		}

		api()
	}, [])


	const handlerCloser = () => {
		setIsReposts(setIsReposts = false)
		document.body.style.overflowY = 'auto'
	}
	const sendPost = async (id) => {
		if (commentsItem) {
			console.log(commentsItem)
			const responce = await fetch('http://localhost:5000/api/user/getComments', {
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify({ item: commentsItem })

			})
			const data = await responce.json()
			console.log(data.post)
			const responceI = await fetch('http://localhost:5000/api/user/repost', {
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify({ id, postName: data.post.userName, postDesc: data.post.description, postData: data.post.data, userSend: temp.id })

			})
			const result = await responceI.json()
			console.log(result)
		}
		handlerCloser()

		console.log(id)
	}
	return (
		<>
			<div className={isReposts ? `${c.repostInMessageWrapper} ${c.closerReposts}` : c.closerReposts} onClick={() => handlerCloser()}></div>
			<div className={isReposts ? `${c.repostInMessage} ${c.closerRepostsMess}` : c.closerRepostsMess}>
				<p className={c.repostTitle}>Поделиться публикацией в личном сообщении:</p>
				<div className={c.content}>
					{userMess.message ? <p>Нет сообщений хуй</p> : ''}
					{userMess && !userMess.message ? userMess.map((message, i) => <div className={c.repostButton} key={i} onClick={() => sendPost(message.currentIdChat)}><Chat props={{ name: message.name, online: message.online, lastMessage: message.lastMessage, userPhoto: message.userPhoto }} /></div>) : ''}
					{!userMess ? <p>Загрузка</p> : ''}
				</div>
			</div>
		</>

	)
}
export default Repost