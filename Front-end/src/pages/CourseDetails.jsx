import { useEffect } from 'react';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { FaStar, FaRegStar } from 'react-icons/fa';
import {
	useGetCursoByIDQuery,
	useGetUserByIDQuery,
	usePutCursosUserMutation,
} from '../store/api/apiSlice';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useModal } from '../hook/useModal';
import ReactPlayer from 'react-player/youtube';
import Modal from '../components/Modal/Modal';
import Button from '../components/Button/Button';
import Dropdown from '../components/Dropdown/Dropdown';
import Loading from '../components/loading/Loading';
import imgBanner from '../assets/img/users.png';
import '../styles/coursesDetails.css';

const CourseDetails = () => {
	// Logica para los Modales
	const [modalAgregarSuccess, showModalAgregarSuccess] = useModal();
	const [modalLoginOnly, showModalLoginOnly] = useModal();
	const [modalCursoRepetido, showModalCursoRepetido] = useModal();
	const [modalUserPro, showModalUserPro] = useModal();

	// Trae el ID desde la API
	const params = useParams();
	const { data: curso, isLoading } = useGetCursoByIDQuery(params.id);

	// Agrega el curso al perfil del usuario
	const [putCursosUser, { isSuccess }] = usePutCursosUserMutation();
	const usuarioStore = useSelector((state) => state.auth);

	// Query para traer datos del usuario desde la API
	const { data: user } = useGetUserByIDQuery(usuarioStore.id, {
		refetchOnMountOrArgChange: true,
	});

	// Logica para comparar estado del corazon de favoritos
	let isActiveCourse = user?.cursosUsuario.some((e) => e.id === curso?.id);

	// Condicionales y manejador del boton agregar a favoritos
	const handlePutCursos = () => {
		if (!usuarioStore.isLoggedIn) {
			showModalLoginOnly();
		} else if (isActiveCourse) {
			showModalCursoRepetido();
		} else if (curso.acceso === 'PRO' && user?.suscripto === 0) {
			showModalUserPro();
		} else if (curso.acceso || user?.suscripto === 1) {
			putCursosUser({ idUsuario: usuarioStore.id, idCurso: curso.id });
		}
	};

	// Manda un modal de exito
	useEffect(() => {
		if (isSuccess) {
			showModalAgregarSuccess();
		}
	}, [isSuccess]);

	// Loader
	if (isLoading) return <Loading />;

	return (
		<div className='curso-container'>
			<div className='curso-detalle'>
				<div className='curso-detalle-video'>
					<div
						className='flex flex-row-reverse items-center font-bold cursor-pointer gap-3'
						onClick={handlePutCursos}>
						{isActiveCourse ? (
							<BsHeartFill className='curso-btn-heart' />
						) : (
							<BsHeart className='curso-btn-heart' />
						)}
						<p>Agregar a tu lista de favoritos</p>
					</div>
					<ReactPlayer
						url={'https://www.youtube.com/embed/' + curso.id_video}
						width='100%'
						height='370px'
					/>
					<div className='curso-btn-stars'>
						<FaStar />
						<FaStar />
						<FaStar />
						<FaStar />
						<FaRegStar />
					</div>
				</div>
				<div className='curso-detalle-info'>
					<h4 className='curso-detalle-title'>{curso.nombreCurso}</h4>
					<p className='curso-detalle-content'>{curso.descripcionCurso}</p>
					<p className='curso-detalle-instructor'>
						<span>Instructor: </span>
						{curso.instructor}
					</p>
					<div className='flex flex-col'>
						<p>
							<span>Duraci??n: </span>48 hs
						</p>
						<p>
							<span>Lenguaje: </span>Espa??ol
						</p>
						<p>
							<span>Certificado: </span>Digital
						</p>
						<p>
							<span>Nivel: </span>Principiante
						</p>
						<p>
							<span>Fecha del actualizacion: </span>21 de Febrero de 2023
						</p>
					</div>
					<Button
						fontSize={'32px'}
						bg={'var(--secondaryColor)'}
						color={'var(--tertiaryColor)'}>
						<Link to={'/planes'}>Contrata Pro</Link>
					</Button>
				</div>
			</div>
			<div className='curso-programa'>
				<div className='curso-programa-title'>
					<h4>PROGRAMA</h4>
				</div>
				<div className='curso-programa-dropdown'>
					{curso.urls.map((e, index) => {
						return (
							<Dropdown
								key={index}
								titulo={e.titulo_video}
								miniatura={e.miniatura_video}
								descripcion={e.descripcion_video}
							/>
						);
					})}
				</div>
			</div>
			<div className='curso-banner'>
				<div className='curso-banner-content'>
					<h4 className='curso-banner-title'>??PARA QUI??N ES EL CURSO?</h4>
					<p className='curso-banner-text'>
						El curso esta dise??ado para las personas que quieran empezar a aprender
						JavaScript y busquen formalizar una carrera en el mundo dev.
					</p>
					<Button
						fontSize={'32px'}
						bg={'var(--secondaryColor)'}
						color={'var(--tertiaryColor)'}>
						<Link to={'/planes'}>Contrata Pro</Link>
					</Button>
				</div>
				<div>
					<img src={imgBanner} alt='users' />
				</div>
			</div>
			<div className='curso-rese??as'>
				<h4 className='curso-rese??as-title'>RESE??AS</h4>
				<div className='curso-rese??as-content'>
					<div className='curso-rese??as-user'>
						<div className='flex items-center gap-10'>
							<div className='curso-rese??as-img'>
								<span>MJ</span>
							</div>
							<div className='flex flex-col gap-5'>
								<span>Marisol Ju??rez</span>
								<p>Es un curso muy bien explicado a detalles</p>
							</div>
						</div>
						<div className='curso-rese??as-stars'>
							<FaStar />
							<FaStar />
							<FaStar />
							<FaStar />
							<FaRegStar />
						</div>
					</div>
					<div className='curso-rese??as-user'>
						<div className='flex items-center gap-10'>
							<div className='curso-rese??as-img'>
								<span>MH</span>
							</div>
							<div className='flex flex-col gap-5'>
								<span>Mauricio Hern??ndez</span>
								<p>
									Buena elecci??n, recomendable para comenzar a programar en este
									lenguaje.
								</p>
							</div>
						</div>
						<div className='curso-rese??as-stars'>
							<FaStar />
							<FaStar />
							<FaStar />
							<FaStar />
							<FaRegStar />
						</div>
					</div>
				</div>
			</div>
			<Modal isActive={modalLoginOnly} showModal={showModalLoginOnly}>
				<h1 className='modal-title'>A??n no has iniciado sesion?</h1>
				<p className='modal-data'>
					Por favor inicia sesion o reg??strate para disfrutar de nuestros cursos
				</p>
			</Modal>
			<Modal isActive={modalUserPro} showModal={showModalUserPro}>
				<h1 className='modal-title'>Contenido de suscripci??n Pro</h1>
				<p className='modal-data'>
					Necesitas estar suscripto para poder agregar este curso
				</p>
			</Modal>
			<Modal isActive={modalAgregarSuccess} showModal={showModalAgregarSuccess}>
				<h1 className='modal-title'>Se agrego el curso con ??xito!</h1>
				<p className='modal-data'>Disfruta del contenido del curso en tu perfil</p>
			</Modal>
			<Modal isActive={modalCursoRepetido} showModal={showModalCursoRepetido}>
				<h1 className='modal-title'>Contenido ya disponible</h1>
				<p className='modal-data'>Ya posees este curso agregado a tu perfil</p>
			</Modal>
		</div>
	);
};

export default CourseDetails;
