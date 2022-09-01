import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersListContainerComponent } from './users-list-container.component';
import {UsersService} from '../../services/users.service';
import {TransformUsersService} from '../../services/transform-users.service';
import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {DatePipe, TitleCasePipe} from '@angular/common';

describe('UsersListContainerComponent', () => {
  let component: UsersListContainerComponent;
  let fixture: ComponentFixture<UsersListContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersListContainerComponent ],
      imports: [HttpClientTestingModule],
      providers: [UsersService, TransformUsersService, HttpClient, DatePipe, TitleCasePipe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
