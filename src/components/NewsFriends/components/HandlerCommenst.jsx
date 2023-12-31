import { useEffect, useState } from "react"
import CommentsItem from './CommentsItem'
import c from '../../YouMusicNews/css/musicNews.module.css'
import info from '../../../assets/info.svg'
const HandlerCommenst = ({ commentsItem, render }) => {
	let [comments, setComments] = useState(false)
	console.log(render)

	useEffect(() => {
		console.log(12312)
		if (render) {
			if (comments) {
				setComments(comments = [...comments, render])
				console.log(comments)
			} else {
				setComments(comments = [render])
				console.log(comments)
			}
		}
		const api = async () => {
			const responce = await fetch('http://localhost:5000/api/user/getComments', {
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify({ item: commentsItem })

			})
			const data = await responce.json()
			setComments(comments = data.post.comments)
			console.log(comments)
		}
		api()
	}, [])
	return (
		<>
			{comments ? comments.map((comm, i) => <CommentsItem key={i} userPhoto={comm.userPhoto} name={comm.user} data={comm.data} value={comm.value} />) : ''}
			{comments.length === 0 ? <p className={c.noneFriends}><img src={info} alt='info' className={c.infoItem} height='20px' width='20px' />Добавьте комментарий</p> : ""}
		</>
	)
}
export default HandlerCommenst