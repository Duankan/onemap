package com.kingtopware.framework.entity;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

import org.apache.commons.lang.NotImplementedException;
import org.hibernate.annotations.GenericGenerator;

@MappedSuperclass
public class BaseEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	
	public String getPrimaryValue() {
		throw new UnsupportedOperationException();
	}
	
	public String getPrimaryKey() {
		throw new UnsupportedOperationException();
	}
}
