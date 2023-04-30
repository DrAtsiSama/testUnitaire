const User = require('./utilisateur');
const mockUser = new User('Mock', 'User', 'mock@example.com', 15);

describe('utilisateur', () => {
  test('Nom / Prenom  correct', () => {
    const user = new User("Fabrice", "Fabien", "fabrice.fabien@hotmail.fr", 13);
    expect(user.name).toBe('Fabrice');
    expect(user.prenom).toBe('Fabien');
  });

  test('Email correct', () => {
    const user = new User("Fabrice", "Fabien", "fabrice.fabien@hotmail.fr", 13);
    const expected = 'Fabrice - Fabien : 13 ans | fabrice.fabien@hotmail.fr';
    expect(user.display()).toBe(expected);
  });

  test('Age >= 13 ans', () => {
    const user = new User("Fabrice", "Fabien", "fabrice.fabien@hotmail.fr", 13);
    expect(user.age).toBe(13);
  });
  test('Mail valide', () => {
    const user = new User("Fabrice", "Fabien", "fabrice.fabien@hotmail.fr", 13);
    expect(user.isMailValid()).toBe(true);
  });
  test('Mail valide mock', () => {
    expect(mockUser.isMailValid()).toBe(true);
  });

});

// jest.mock('./utilisateur', () => {
//   return jest.fn().mockImplementation(() => {
//     return mockUser;
//   });
// });

describe('My test suite', () => {
  test('My test case', () => {
    const user1 = new User("Mock", "User", "mock@example.com", 15);
    expect(user1).toEqual(mockUser);
  });
});