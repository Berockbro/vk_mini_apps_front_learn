import React, { useState, useEffect, useRef, Fragment } from 'react';
import PropTypes from 'prop-types';

import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar, CardGrid, ContentCard, FixedLayout, Separator, WriteBar, WriteBarIcon } from '@vkontakte/vkui';
import io from 'socket.io-client';

const SERVER_URL = 'http://localhost:5000';

const Home = ({ id, go, fetchedUser, messages, sendMessage }) => {

	const [messages, setMessages] = useState([])
	const handleChangeText = (e) => {
		setText(e.target.value)
	}
	const handleSendChangeText = (e) => {
		e.preventDefault()
		const trimed = text.trim()
		if (trimmed) {
			sendMessage({
				messageText: text, 
				senderName: `${fetchedUser.first_name} ${fetchedUser.last_name}`})
			setText('')	
		}
	}
	/*const sendMessage = ({messageText, senderName})=> {
		socket.current.emit('message:add', {
			userId,
			messageText,
			senderName
		})
	}*/
	

	return (
		<Panel id={id}>
			<PanelHeader>Чатик</PanelHeader>

			{/*fetchedUser &&
			<Group header={<Header mode="secondary">User Data Fetched with VK Bridge</Header>}>
				<Cell
					before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
					description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
				>
					{`${fetchedUser.first_name} ${fetchedUser.last_name}`}
				</Cell>
			</Group>*/}

			{/*<Group header={<Header mode="secondary">Navigation Example</Header>}>
				<Div>
					<Button stretched size="l" mode="secondary" onClick={go} data-to="persik">
						Show me the Persik, please
					</Button>
				</Div>
			</Group>*/}

			<Group>
				<CardGrid size="l">
					{messages.map((msg) => (
						<ContentCard
							src="https://images.unsplash.com/photo-1603988492906-4fb0fb251cf8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80"
							header="brown and gray mountains under blue sky during daytime photo"
							text="Mountain changji"
							caption="Photo by Siyuan on Unsplash"
							
						/>
					))}
				</CardGrid>
			</Group>

			<FixedLayout vertical="bottom">
            	<Separator wide />
				<WriteBar
					after={
						<Fragment>
							{<WriteBarIcon 
								mode="send" 
								onClick={handleSendMessage}
								/>}
						</Fragment>
					}
					value={text}
					onChange={handleSendText}
					placeholder="Сообщение"
				/>
        	</FixedLayout>
			
		</Panel>
	)
};

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
};

export default Home;
