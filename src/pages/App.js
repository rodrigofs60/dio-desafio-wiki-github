import { useState } from 'react';
import github from '../assets/github.png'
import Input from '../components/input';
import { Container } from './styles';
import ItemRepo from '../components/itemRepo';
import Button from '../components/button';
import { api } from '../services/api';

function App() {
  const [currentRepo, setCurrentRepo] = useState('');
  const [repos, setRepos] = useState([]);

  const handleSearchRepo = async () => {
    const { data } = await api.get(`repos/${currentRepo}`);

    if (data.id) {
      const isExist = repos.find(repo => repo.id === data.id);
      if (!isExist) {
        setRepos(prev => [...prev, data]);
        setCurrentRepo('');
        return;
      }
    }
    alert('Repositório não encontrado');
  }

  const handleremoveRepo = (id) => {
    setRepos(prevRepos => prevRepos.filter(repo => repo.id !== id));
  }

  return (
    <Container>
      <img src={github} width={72} height={72} alt='github logo'></img>
      <Input value={currentRepo} onChange={e => setCurrentRepo(e.target.value)} />
      <Button onClick={handleSearchRepo} />
      {repos.map(repo => (
        <ItemRepo key={repo.id} handleRemoveRepo={handleremoveRepo} repo={repo} />
      ))}
    </Container>
  );
}

export default App;
