describe('Login and Wallet Address Update', () => {
  
    let refreshToken;
  
    it('should log in successfully with valid credentials', () => {
      cy.request({
        method: 'POST',
        url: 'https://my.mystnodes.com/api/v2/auth/login', 
        body: {
          email: 'tigranadamyan1994@gmail.com',  
          password: 'Adam212555444595!',
          remember: false 
        }
      }).then((response) => {
        expect(response.status).to.eq(200); 
        expect(response.body).to.have.property('refreshToken'); 
        refreshToken = response.body.refreshToken; 
        cy.log('Refresh Token:', refreshToken); 
      });
    });
  
    it('should update the wallet address successfully', () => {
      cy.log('Refresh Token for Wallet Update:', refreshToken);

      cy.request({
        method: 'PUT',
        url: 'https://my.mystnodes.com/api/v2/me/wallet-address',
        headers: {
          Authorization: `Bearer ${refreshToken}` 
        },
        body: {
          walletAddress: '0x11ab2b6f958af12d5f3e226f9d971c82889c9c63'
        },
      }).then((response) => {
        expect(response.status).to.eq(200); 
        cy.log('Response:', response.body); 
      });
    });
});
