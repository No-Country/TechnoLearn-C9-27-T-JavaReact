import React, { useEffect } from 'react';
import { BsFillPlayCircleFill, BsHeart, BsHeartFill } from 'react-icons/bs';
import { FaStar, FaRegStar, FaAngleRight } from 'react-icons/fa';
import { TfiFaceSad } from 'react-icons/tfi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	usePutCursosUserMutation,
	useGetUserByIDQuery,
} from '../../store/api/apiSlice';
import { useModal } from '../../hook/useModal';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import './Card.css';

const CardComponent = ({
	nombreCurso,
	miniaturaCurso,
	id,
	acceso,
	instructor,
}) => {
	// Logica para traer desde el store datos del usuario
	const idUsuario = useSelector((state) => state.auth.id);
	const isLog = useSelector((state) => state.auth.isLoggedIn);

	// Query para traer datos del usuario desde la API
	const { data } = useGetUserByIDQuery(idUsuario, {
		refetchOnMountOrArgChange: true,
	});

	// Query para agregar curso al dashboard del usuario
	const [putCursosUser, { isSuccess }] = usePutCursosUserMutation();

	// Logica para los Modales
	const [modalAlertSuccess, showModalAlertSuccess] = useModal();
	const [modalAlertCard, showModalAlertCard] = useModal();
	const [modalAlertLog, showModalAlertLog] = useModal();
	const [modalAlertPro, showModalAlertPro] = useModal();

	// Logica para comparar estado del corazon de favoritos
	let filtroId = data?.cursosUsuario.some((e) => e.id === id);

	// Condicionales y manejador del boton agregar a favoritos
	const handlePutCursos = () => {
		if (isLog === false) {
			showModalAlertLog();
		} else if (filtroId) {
			showModalAlertCard();
		} else if (acceso === 'PRO' && data?.suscripto === 0) {
			showModalAlertPro();
		} else if (acceso || data?.suscripto === 1) {
			putCursosUser({ idUsuario, idCurso: id });
		}
	};

	// Manda un modal de exito
	useEffect(() => {
		if (isSuccess) {
			showModalAlertSuccess();
		}
	}, [isSuccess]);

	return (
		<div className='card-container '>
			<div className='card-img-container'>
				<BsFillPlayCircleFill className='btn-play' />
				<img src={miniaturaCurso} alt='FOTO' />
			</div>
			<h5 className='card-title'>{nombreCurso}</h5>
			<p className='card-text'>
				<span className='font-bold text-2xl'>Instructor: </span>
				{instructor}
			</p>
			<div className='card-btn-container'>
				<div className='card-btn-fav'>
					<div className='card-btn-stars'>
						<FaStar />
						<FaStar />
						<FaStar />
						<FaStar />
						<FaRegStar />
					</div>
					<div
						className='flex flex-col items-center text-center font-bold cursor-pointer'
						onClick={handlePutCursos}>
						{filtroId ? (
							<BsHeartFill className='card-btn-heart' />
						) : (
							<BsHeart className='card-btn-heart' />
						)}
						<p>Agregar a tus favoritos</p>
					</div>
				</div>
				<div className='card-btn-text'>
					<p>CURSO {acceso}</p>
					<Button fontSize={'24px'}>
						<Link to={`/courses/${id}`} className='flex items-center gap-3'>
							Ver más <FaAngleRight />
						</Link>
					</Button>
				</div>
			</div>
			<Modal isActive={modalAlertLog} showModal={showModalAlertLog}>
				<h1 className='modal-title'>Aún no has iniciado sesion?</h1>
				<p className='modal-data'>
					Por favor inicia sesion o regístrate para disfrutar de nuestros cursos
				</p>
			</Modal>
			<Modal isActive={modalAlertPro} showModal={showModalAlertPro}>
				<h1 className='modal-title'>Contenido de suscripción Pro</h1>
				<p className='modal-data'>
					Necesitas estar suscripto para poder agregar este curso
				</p>
				<p className='modal-title'>
					<TfiFaceSad />
				</p>
			</Modal>
			<Modal isActive={modalAlertSuccess} showModal={showModalAlertSuccess}>
				<h1 className='modal-title'>Se agrego el curso con éxito!</h1>
				<p className='modal-data'>Disfruta del contenido del curso en tu perfil</p>
			</Modal>
			<Modal isActive={modalAlertCard} showModal={showModalAlertCard}>
				<h1 className='modal-title'>Contenido ya disponible</h1>
				<p className='modal-data'>Ya posees este curso agregado a tu perfil</p>
			</Modal>
		</div>
	);
};

export default React.memo(CardComponent);
