import React, { useEffect, useState } from 'react';
import './App.css';
import Fundo from './lorena-fundo.svg';
import Fundo2 from './lorena-informacoes.svg';
import Logo from './lorena-menu.svg';
import lorenaPc from './lorena-pc.GIF'
import voltar from './voltar.png'
import Mais from './mais.png'
import Menos from './menos.png'
import Waze from './waze.png'
import Maps from './google-maps.png'

import Individual from './individuall.png';
import Seta from './seta.png';
import LogoPreto from './logoPreto.png';
import Slide from '@mui/material/Slide';
// import TextField from '@mui/material/TextField';

import IconButton from '@mui/material/IconButton';
import Fingerprint from '@mui/icons-material/Fingerprint';
import ReactScrollWheelHandler from 'react-scroll-wheel-handler';
import axios from 'axios';
// import QRCode from 'react-qr-code';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import ChangingProgressProvider from './ChangingProgressProvider';
import InputMask from 'react-input-mask';

import 'react-circular-progressbar/dist/styles.css';

export default function App() {
	const [pagina1, setPagina1] = useState(true);
	const [pagina2, setPagina2] = useState(false);
	const [pagina3, setPagina3] = useState(false);
	const [pagina4, setPagina4] = useState(false);
	const [pagina5, setPagina5] = useState(false);
	const [notFound, setNotFound] = useState(false);
	const [loading, setLoading] = useState(false);
	const [mais, setMais] = useState(false);
	const [vou, setVou] = useState(false);

	const [nome, setNome] = useState('');
	const [telefone, setTelefone] = useState('');
	const [convidados, setConvidados] = useState([]);
	const [convidado, setConvidado] = useState();

	function handleChange() {
		
		setPagina2(true);
		setPagina1(false);
	}

	async function vai() {
		let data = { data: convidado, confirmacao: 'S' };
		await axios
			.post(`${process.env.REACT_APP_URL}/confirmacao`, data)
			.then(setPagina5(true), setPagina4(false), setVou(true));

	}

	async function naoVai() {
		let data = { data: convidado, confirmacao: 'N' };
		await axios
			.post(`${process.env.REACT_APP_URL}/confirmacao`, data)
			.then(setPagina5(true), setPagina4(false),setVou(false));
	}


	async function handleChange3() {
		setMais(false)
		setLoading(true);
		let tel = undefined;
		if (telefone !== undefined && telefone !== '' && telefone !== null) {
			tel = telefone.replace(/ /g, '').replace('-', '');
		} else {
			setLoading(false);
			setNotFound(true);
			setTimeout(() => {
				setNotFound(false);
			}, 3000);
		}
			let convidadoFind = convidados.find(({ telefone }) => telefone == tel);
				if (convidadoFind && tel) {
					setLoading(false);
					setConvidado(convidadoFind);
					setPagina3(true);
					setPagina2(false);
				} else {
					setLoading(false);
					setNotFound(true);
					setTimeout(() => {
						setNotFound(false);
					}, 3000);
				}

		
	}
	async function handleChange4() {
		setMais(false)
		setLoading(true);
		// let tel = undefined;
		// if (telefone !== undefined && telefone !== '') {
		// 	tel = telefone.replace(/ /g, '').replace('-', '');
		// }
		// let convidadoFind = convidados.find(({ telefone }) => telefone == tel);

		// if (convidadoFind) {
			setLoading(false);
			// setConvidado(convidadoFind);
			setPagina4(true);
			setPagina3(false);
		// } else {
		// 	setLoading(false);
		// 	setNotFound(true);
		// 	setTimeout(() => {
		// 		setNotFound(false);
		// 	}, 3000);
		
		// 	}
		
	}

	useEffect(() => {
		async function getData() {
			await axios.get(`${process.env.REACT_APP_URL}/getConvidados`).then((response) => {
				setConvidados(response.data);
			});
		}
		getData();
	}, []);

	return (
		<div className="App">
			{loading ? (
				<div id="loading">
					oiiiiiii
					<div style={{ width: 50, height: 50 }}>
						<ChangingProgressProvider values={[100, 0]}>
							{(percentage) => (
								<CircularProgressbar
									styles={buildStyles({
										rotation: (1 - percentage / 100) / 2,
									})}
									value={percentage}
								/>
							)}
						</ChangingProgressProvider>
					</div>
				</div>
			) : (
				''
			)}
			{/* {convidados.length == 0 ? <p>oi</p> : <p>ooi</p>} */}
			{pagina1 ? (
				<ReactScrollWheelHandler
					downHandler={() => {
						handleChange();
					}}
					customStyle={{
						width: '150%',
						height: '100vh',
					}}
				>
					<div className="logo">
						<img src={Fundo} width="100%" />
					</div>
					{pagina2 ? (
						''
					) : (
						<div className="seta" onClick={handleChange}>
							<img className="seta-animation" src={Seta}  />
						</div>
					)}
				</ReactScrollWheelHandler>
			) : (
				''
			)}
			
			{pagina2 ? (
				<Slide direction="up" in={pagina2} mountOnEnter unmountOnExit>
					<div id="pagina2">

						<img id="img2" src={Logo} width="50%" />
						{notFound ? (
								<p
									style={{
										position: 'absolute',
										color: 'yellow',
										top: '58vh',
										textAlign: 'center',
										fontSize: '1.3rem',
									width: "100vw",
									fontFamily:" 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"

									}}
								>
									Convidado não encontrado. <br />
								</p>
							) : (
								''
							)}
						<img src={voltar} className="voltar" height="30px" onClick={() => { setPagina1(true); setPagina2(false)}}/> 
						<div id="form">
							<p>Digite seu telefone:</p>
							<div id="tel">
								<InputMask
									mask=" 99 99999-9999"
									placeholder="99 99999-9999"
									onChange={(e) => setTelefone(e.target.value)}
								/>
							</div>
						
						</div>

							<div className="seta" onClick={handleChange3}>
								<img className="seta-animation" src={Seta} height="30%" />
							</div>
						
					</div>
				</Slide>
			) : (
				''
			)}


			{pagina3 && convidado !== null ? (
				<Slide direction="up" in={pagina3} mountOnEnter unmountOnExit>
					<div id="pagina3">
						<p id="ola">Olá, {convidado?.nome}!</p>
						<img src={voltar} className="voltar" height="30px" onClick={() => { setPagina2(true); setPagina3(false); setConvidado(null);  setTelefone(null)}}/> 
						{mais ? <div id="mais">
							<p onClick={() => setMais(false)}>X</p>
							{/* A 650 metros da Cidade das Abelhas.
Vir pelo embu, por outro caminho pega rua de terra.
							Ao chegar na cidade das abelhas 🐝 mantenha-se a direita! 
							<br/> */}
							<p id="waze-text">
							Acesse a viagem:	<a href="https://waze.com/ul/h6gy9hxj1k"><img src={Waze} id="waze" /></a>
							<a href="https://maps.app.goo.gl/ksWtybNY7rq2Mge19?g_st=ia"><img src={Maps} id="waze" /></a>
							</p>
							
							
						</div> : null}
						<div onClick={()=>setMais(!mais)} className="como-chegar">COMO CHEGAR   <img src={!mais ? Mais : Menos} height="12vh" style={{marginLeft: "0.5rem"}}/></div>
						<img src={Fundo2} id="img4" />
						<br />
						<div className="seta" onClick={handleChange4}>					
								<img className="seta-animation" src={Seta} height="30%" />
							</div>
					</div>
				</Slide>
			) : (
				''
			)}



			{pagina4 ? (
				<Slide direction="up" in={pagina4} mountOnEnter unmountOnExit>
					<div id="pagina4">
						<div id="left" onClick={naoVai}>
							<IconButton aria-label="fingerprint" color="success" disabled>
								<div id="option">
									<Fingerprint />
									<p>NÃO VOU</p>
								</div>
							</IconButton>
						</div>
						<div id="right" onClick={vai}>
							<IconButton aria-label="fingerprint" disabled>
								<div id="option">
									<Fingerprint />
									<p>VOU</p>
								</div>
							</IconButton>
						</div>
					</div>
				</Slide>
			) : (
				''
			)} 
						{pagina5 ? (
				<Slide direction="up" in={pagina5} mountOnEnter unmountOnExit>
					<div id="pagina5">

						<img src={Logo}  id="img5" />
						<img src={lorenaPc} alt="loading..." id="lorena-pc" />

					<img src={voltar} className="voltar" height="30px" onClick={() => { setPagina3(true); setPagina5(false)}}/> 
						{!vou ? 						<p style={{ color: "white", fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif" }}>Poxa, que pena!! 😢</p>
 : <p style={{ color: "white", fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif" }}>Uhuu, te espero lá!! ❤️</p>}
					</div>
				</Slide>
			) : (
				''
			)}
		</div>
	);
}

