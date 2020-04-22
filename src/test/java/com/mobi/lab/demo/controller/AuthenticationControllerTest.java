//package com.mobi.lab.demo.controller;
//
//import com.mobi.lab.demo.model.user.UsersDto;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
//import org.springframework.boot.test.web.client.TestRestTemplate;
//import org.springframework.http.HttpEntity;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpMethod;
//import org.springframework.http.ResponseEntity;
//import org.springframework.test.context.junit4.SpringRunner;
//import org.springframework.ui.ModelMap;
//
//import static org.junit.jupiter.api.Assertions.assertEquals;
//
//@RunWith(SpringRunner.class)
//@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
//public class AuthenticationControllerTest {
//	private final static String AUTHENTICATE_URI="/authenticate";
//	private final static String ACCOUNT_URI="/api/account";
//	@Autowired
//	private TestRestTemplate restTemplate;
//
//	@Test
//	public void checkUserAuthentication() {
//		Object id_token = getJwtTokenFromServerWithExistingUserInDatabase();
//		assertEquals(true, id_token != null);
//	}
//
//	@Test
//	public void afterAuthorizationGetUserAccountDetailForUIPurposes() {
//		Object jwt_Token = getJwtTokenFromServerWithExistingUserInDatabase();
//		HttpHeaders headers = new HttpHeaders();
//		headers.set("Authorization", "Bearer " + jwt_Token);
//
//		HttpEntity entity = new HttpEntity(headers);
//
//		ResponseEntity<String> response = restTemplate.exchange(
//				ACCOUNT_URI, HttpMethod.GET, entity, String.class);
//
//		assertEquals("mehdi", response.getBody() );
//	}
//
//    private String getJwtTokenFromServerWithExistingUserInDatabase() {
//        UsersDto userDto = new UsersDto();
//        userDto.setUsername("mehdi");
//        userDto.setPassword("123456");
//        ResponseEntity<ModelMap> modelMapResponseEntity = this.restTemplate.postForEntity(AUTHENTICATE_URI, userDto, ModelMap.class);
//        return modelMapResponseEntity.getBody().get("id_token").toString();
//    }
//
//}
