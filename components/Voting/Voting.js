
import { Button, FormControlLabel, Radio, RadioGroup, Paper, CardContent } from '@mui/material';
import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';


export default function Voting({ polls }) {
	// console.log(polls)
	const voting = polls?.slice(0, 3);
	const [voteValue, setVoteValue] = useState("");


	const handleVoteSubmit = (e, data) => {
		console.log(voteValue);
		e.preventDefault();


		let vote = Object.assign({}, data.vote)
		console.log(vote);

		if (voteValue === "yes") {
			vote.yes = parseInt(vote.yes) + 1
		}
		else if (voteValue === "no") {
			vote.no = parseInt(vote.no) + 1
		}
		else if (voteValue === "noComment") {
			vote.noComment = parseInt(vote.noComment) + 1
		}
		console.log(vote);


		fetch(`/api/poll?id=${data?._id}`, {
			method: "PUT",
			headers: {
				"content-type": "application/json"
			},
			body: JSON.stringify(vote)
		})
			.then(res => res.json())
			.then(data => {
				if (data.modifiedCount > 0) {
					Swal.fire({
						icon: 'success',
						title: 'Success',
						text: `Vote success for this news`,
					})
				}
			})

	};

	return (
		<div className='container '>
			<div className='flex gap-6 my-16'>
				{
					voting?.map(vote => <div className='flex items-stretch' key={vote?._id}>
						<Paper sx={{ padding: 2, }}>
							<img src={vote?.images?.img1} style={{ width: '100%', maxHeight: '220px' }} alt="Vote Img" />
							<CardContent><h1 className='my-3 text-xl'>{vote?.question}</h1></CardContent>
							<form onSubmit={(e) => handleVoteSubmit(e, vote)} className="flex flex-col">
								<div className='flex justify-between mb-3 border-b'>
									<p className='font-semibold'>Vote</p>
									<p className='mr-3 font-semibold'>Count</p>
								</div>
								<RadioGroup onChange={(e) => setVoteValue(e.target.value)} name="radio-buttons-group">
									<div className='flex justify-between'><FormControlLabel value="yes" control={<Radio />} label="Yes" /> <p className='mr-3'>{vote?.vote?.yes}</p></div>
									<div className='flex justify-between'><FormControlLabel value="no" control={<Radio />} label="No" /><p className='mr-3'>{vote?.vote?.no}</p></div>
									<div className='flex justify-between'><FormControlLabel value="noComment" control={<Radio />} label="No Comment" /><p className='mr-3'>{vote?.vote?.noComment}</p></div>
								</RadioGroup>
								<Button color='success' variant='contained' type='submit'>Vote</Button>
							</form>
						</Paper>
					</div>
					)}
			</div>
		</div>
	)
};

