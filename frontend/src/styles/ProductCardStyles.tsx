import styled from 'styled-components'

export const Card = styled.div`
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 1rem;
  width: 100%;
  max-width: 260px;
  background-color: #fff;
  text-align: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  }
`

export const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 1rem;
`

export const Title = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: #222;
  font-weight: 600;
`

export const Description = styled.p`
  font-size: 0.95rem;
  color: #555;
  margin-bottom: 0.75rem;
`

export const Price = styled.strong`
  font-size: 1.1rem;
  color: #28a745;
  margin-bottom: 1rem;
`
export const AddButton = styled.button`
  margin-top: 1rem;
  padding: 0.6rem 1.2rem;
  background-color: #007bff;
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`
