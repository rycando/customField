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

- DI(Dependency Injection) 을 통해 모듈 간 결합도 감소
- tsyringe 라이브러리를 이용해 IOC(Inversion Of Control)로 자원낭비 감소 / 재사용성 향상

#### 계층형 아키텍쳐

- Router - Controller - Service - Repository 구조
- 재사용성 향상
- 결합도를 낮춰 변화에 용이

#### State-Machine

- javascript-state-machine 라이브러리 사용
- orderStatus에 대한 Transition 미리 정의하여 각 단계에서 변화할 수 있는 status 제한

  ![state-machine-visualize](https://user-images.githubusercontent.com/51469261/165961345-a92022df-2e5a-43ac-a0fd-b3dcc1efe89a.svg)

---

## How to Test

### PostMan

- Postman에서 test/ 디렉토리 내 json 파일 import
- environment local로 설정
- collection 내에 있는 Request로 테스트

### 구현하지 못하거나 아쉬운 부분

- 일부 update API를 구현하지 못했습니다.
- 테스트 편의를 위해 pagination을 생략하였습니다.
  - 실제로 구현한다면 커머스 특성상 skip (offset)을 이용한 페이지네이션 보다는 cursor based 페이지네이션을 이용할 것 같습니다.
  - (ex) startId, endId 저장 후 \$gt, $lt 조건으로 쿼리
- DTO 객체를 만드는 과정에서 과도하게 map을 돌거나 불필요하게 쿼리하는 부분이 있습니다.
