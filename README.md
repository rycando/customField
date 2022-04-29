# CustomField

이 프로젝트는 커머스 예시로 `사용자 정의 필드`를 구현하는 것을 핵심으로 합니다.

---

## Requirment

- Docker
- Docker-compose
- node.js

---

## Installation & Start

레포를 클론하고 start.sh 파일을 실행시켜주세요

```
$ ./start.sh
```

---

## Model

#### CustomField

- Store 별로 관리 되어야 함
- 여러 모델에 대해 필드를 구현할 수 있어야 함
- 여러 타입을 구현할 수 있어야 함
- 유저가 관리할 수 있음
- (추가) 필수 여부를 지정할 수 있어야 함

#### CustomValues

- 모델을 Read 할 때마다 읽어와야 함 (JOIN을 피해야 함)
- CustomField와 연관관계를 가지고 함께 관리할 수 있어야 함
- CustomField에서 정의한 타입에 맞아야 함

![model](https://user-images.githubusercontent.com/51469261/165954598-d74cba9f-b01e-4a27-922e-08629b454db6.png)

### 구현

#### 사용자 정의 필드 모델링

> customField는 관리하기 편하도록 별도 필드로, 그에 해당하는 값인 customValue는 빠른 Read를 위해 모델 내에 저장  
> 단, customValue와 customField가 연관관계를 유지해야하므로 customField \_id를 저장하는 별도 Document로 스키마 분리

#### 타입 Validation

> 사용자가 정의한 타입에 맞게 값을 저장할 수 있어야 함  
> enum 타입으로 설정할 수 있는 타입을 제한하고, type Validation을 통해 저장 전 확인

---

## Architecture

#### DI, IOC

#### 계층형 아키텍쳐

#### State-Machine

---

## How to Test

### PostMan

- Postman에서 test/ 디렉토리 내 json 파일 import
- environment local로 설정
- collection 내에 있는 Request로 테스트
