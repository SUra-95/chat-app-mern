const GenderCheckbox = ({oncheckboxChange, selectedGender}) => {
	return (
		<div className='flex'>
			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer`}>
					<span className='label-text'>Male</span>
					<input type='checkbox' className={`checkbox border-slate-900 ${selectedGender === 'male' ? 'checked' : ''}`}
						checked={selectedGender === 'male'}
						onChange={() => oncheckboxChange('male')}
					/>
				</label>
			</div>
			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer`}>
					<span className='label-text'>Female</span>
					<input type='checkbox' className={`checkbox border-slate-900 ${selectedGender === 'female' ? 'checked' : ''}`}
					checked={selectedGender === 'female'} 
					onChange={() => oncheckboxChange('female')} />
				</label>
			</div>
		</div>
	);
};
export default GenderCheckbox;