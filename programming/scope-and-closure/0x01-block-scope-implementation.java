
private Stack<StackFrame> stack = new Stack<StackFrame>();

public class StackFrame {
    // ...
    StackFrame parentFrame = null;

    // 作用域中的所有变量
    VariableObject valueContainer = null;
}

public class VariableObject {
    //成员变量
    protected Map<Variable, Object> fields = new HashMap<Variable, Object>();
}



// Scope implementation

// When entry if block:
StackFrame myIfFrame = new StackFrame();
stack.push(myIfFrame);


// When exit if block
stack.pop();


// Read a variable by `variableName`

StackFrame f = stack.peek();
VariableObject valueContainer = null;
while (f != null) {
    valueContainer = f.valueContainer;
    if (Object value = valueContainer.get(variableName) != null)  {
        return value;
    }
    f = f.parentFrame; // scope chain
}
// Reference error
