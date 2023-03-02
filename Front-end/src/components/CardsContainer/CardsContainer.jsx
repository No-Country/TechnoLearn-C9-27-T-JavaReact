import { useState } from 'react';
import { useGetCursosQuery } from '../../store/api/apiSlice';
import CardComponent from '../Cards/CardComponent';
import Loading from '../loading/Loading';
import './CardsContainer.css';

export const CardsContainer = () => {
	const { data, isLoading } = useGetCursosQuery();
	const [statesViews, setStatesViews] = useState('');
	const [randomCourses, setRandomCourses] = useState([]);
	const [selectButtons, setSelectButtons] = useState(false);

	const changeButtons = (button) => {
		setSelectButtons(button);
		ranmdom();
	};

	const ranmdom = () => {
		const randomCourses = [];
		setRandomCourses([]);
		setStatesViews('random');
		const cursosCopy = [...data.cursos];
		for (let i = 0; i < 6; i++) {
			const randomIndex = Math.floor(Math.random() * cursosCopy.length);
			randomCourses.push(cursosCopy[randomIndex]);
			cursosCopy.splice(randomIndex, 1);
		}
		setRandomCourses(randomCourses);
	};

	if (isLoading) return <Loading />;

	return (
		<section className='course-section'>
			<div className='courses-container'>
				<h4 className='courses-title'>CURSOS</h4>
				<div className='courses-tags'>
					<button
						className={selectButtons === 'morViews' ? 'active' : ''}
						onClick={() => changeButtons('morViews')}>
						Más vistos
					</button>
					<button
						className={selectButtons === 'newest' ? 'active' : ''}
						onClick={() => changeButtons('newest')}>
						Nuevos
					</button>
					<button
						className={selectButtons === 'best-rated' ? 'active' : ''}
						onClick={() => changeButtons('best-rated')}>
						Mejor calificados
					</button>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 cards-container'>
					{statesViews === 'random'
						? randomCourses.slice(0, 6).map((e) => {
								return (
									<CardComponent
										key={e.id}
										id={e.id}
										acceso={e.acceso}
										instructor={e.instructor}
										nombreCurso={e.nombreCurso}
										miniaturaCurso={e.miniaturaCurso}
									/>
								);
						})
						: data.cursos.slice(0, 6).map((e) => {
								return (
									<CardComponent
										key={e.id}
										id={e.id}
										acceso={e.acceso}
										instructor={e.instructor}
										nombreCurso={e.nombreCurso}
										miniaturaCurso={e.miniaturaCurso}
									/>
								);
						  })}
				</div>
			</div>
		</section>
	);
};
